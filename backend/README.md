# The Project

This project is a complete authentation setup with AWS cognito user pool and an authorizor to serverless lambda functions. 

You can take this repo: https://github.com/JohnGJackson0/react_native_clean_architecture_login_template

Clone it and replace the base urls to your own to have a complete authentication setup in AWS. 


# Authentication setup

1. Fork this repo
2. Clone the repo on your PC
3. Create or login to AWS account
4. Create coginto user pool. I will share the exact settings if needed to connect this API.

Cognito user pool settings: 

Sign In
- Cognito user pool sign-in options: Email
- Password requirements set to cognito default:
Contains at least 1 number
Contains at least 1 special character
Contains at least 1 uppercase letter
Contains at least 1 lowercase letter
Password minimum length
8 character(s)
Temporary passwords set by administrators expire in
7 day(s)
- Multi-factor authentication: No MFA
- User Account Recovery: 
 Self-service account recovery: Enabled
 Recovery message delivery method: Email only

Sign Up
- Attribute verification and user account confirmation
Allow Cognito to automatically send messages to verify and confirm: Enabled
Attributes to verify: Send email message, verify email address
Verifying attribute changes:
Keep original attribute value active when an update is pending: Enabled
Active attribute values when an update is pending: Email address
- Required attributes: email
- Custom attributes: None
- Self Registration: Enabled

Messaging
- Email provider: Send email with Cognito
- From Email Address: no-Reply@verificationemail.com

App Integration
- User Pool Name: <Pick a name for your app integration>
- App Type: public client
- App client name: <Pick App Client name>
- Client Secret: none - don't generate 


App Client:

- App Client Information
Authentication flows:
ALLOW_ADMIN_USER_PASSWORD_AUTH
ALLOW_CUSTOM_AUTH
ALLOW_REFRESH_TOKEN_AUTH
ALLOW_USER_PASSWORD_AUTH
ALLOW_USER_SRP_AUTH

Authentication flow session duration: 3 minutes
Refresh token expiration: 30 days
Access token expiration: 60 days
ID token expiration: 60 minutes

Advanced authentication settings:
Enable token revocation
Enable prevent user existence errors

5. Replace example client id qf3oj4jkp9p1agcnkdmnm7gbj with your own.
6. Download SAM 
7. Run Sam Deploy at root
8. Replace your base URL in all the curl example and they should run

  
