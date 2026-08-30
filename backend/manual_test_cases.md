# Manual QA Test Cases: Data Lifecycle, RBAC & Transactions

This document outlines the manual test procedures to validate the core backend functionalities.

## 1. Registration & User Provisioning (Sign-Up)

| Test ID | Scenario | Pre-conditions | Steps | Expected Result |
|---------|----------|----------------|-------|-----------------|
| REG-01 | Successful Student Signup | Unique email ready | 1. Send `POST /api/auth/signup` with valid JSON body (email, password, full_name). | Returns 200 OK. User record created with `role="STUDENT"`. Empty Profile record is automatically generated. |
| REG-02 | Admin Self-Signup Prevention | - | 1. Send `POST /api/auth/signup` adding `"role": "ADMIN"`. | System overrides role to "STUDENT". Admin cannot be self-provisioned. |
| REG-03 | Duplicate Email Rejection | Account with email `test@test.com` exists | 1. Send `POST /api/auth/signup` with `email="test@test.com"`. | Returns 400 Bad Request. Transaction rolls back cleanly without 500 error. |

## 2. Session Lifecycle & Token Management (Login / Logout)

| Test ID | Scenario | Pre-conditions | Steps | Expected Result |
|---------|----------|----------------|-------|-----------------|
| SES-01 | Successful Login | Valid credentials | 1. Send `POST /api/auth/login`. | Returns 200 OK with UUID `token`. Database creates active `UserSession` and updates `last_login_at` and `login_attempts`. |
| SES-02 | Failed Login Audit | Invalid credentials | 1. Send `POST /api/auth/login` with wrong password. | Returns 401 Unauthorized. Database `login_attempts` increments, but `last_login_at` is NOT updated. |
| SES-03 | Token Invalidation on Logout | Active token | 1. Send `POST /api/auth/logout` with token in header. | Returns 200 OK. `UserSession` is marked `is_active=False`. |
| SES-04 | Reused Token Rejection | Logged out token | 1. Send `GET /api/profile` with logged-out token. | Returns 401 Unauthorized. |

## 3. Role-Based Operations & Persistence (Data Management)

| Test ID | Scenario | Pre-conditions | Steps | Expected Result |
|---------|----------|----------------|-------|-----------------|
| RBAC-01 | Student Profile Update | Active student token | 1. Send `POST /api/profile` with updated degree info. | Returns 200 OK. `Profile.updated_at` timestamp is modified. |
| RBAC-02 | Student Accessing Admin Route | Active student token | 1. Send `GET /api/admin/users`. | Returns 403 Forbidden. Access is strictly blocked. |
| RBAC-03 | Admin Modifying Users | Active admin token | 1. Send `PUT /api/admin/users/{id}` changing a user's role to ADMIN. | Returns 200 OK. Target user's role is updated. |
| RBAC-04 | Admin Promoting Self | Active admin token | 1. Send `PUT /api/admin/users/{id}` for self. | Returns 200 OK. Successful update. |

## 4. Data Integrity & Bounds

| Test ID | Scenario | Pre-conditions | Steps | Expected Result |
|---------|----------|----------------|-------|-----------------|
| DATA-01 | Emoji & Special Char Input | Active token | 1. Send `POST /api/profile` with `degree="👨‍🎓 B.Sc; DROP TABLE users;"`. | Returns 200 OK. No SQL injection. Data is saved and retrieved exactly as entered without truncation. |
| DATA-02 | Excessively Long Input | Active token | 1. Send `POST /api/profile` with `university` length > 10,000 chars. | Depending on DB limits (SQLite allows large text), succeeds or throws clean 400/422. It should not crash the server. |
