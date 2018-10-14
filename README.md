Prerequisites
  - NodeJS (including npm),  version >= v10.9.0 (https://nodejs.org)

Tools
  - NodeJS

Dependencies
  - express framework, body-parser
  - request package (convenient way to make HTTP calls)

Deployment
  - clone repo from git
  - change directory to repo's directory
  - run command "npm i" (should be done once to install dependencies)
  - run command "node index"
  - access from browser http://localhost:3019

Limitations
  - non-secure HTTP
  - very basic fields validation
  - very basic error handling (from providers)
  - no unit tests
  - limited, non-HTML email content
  - mailgun provider in the sandbox environment allows to send emails to recipients from the approved list only
  