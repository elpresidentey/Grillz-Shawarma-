@echo off
echo Starting Lagos Shawarma App...
echo.

REM Try different ways to start the app
echo Attempt 1: Using npx...
npx react-scripts start

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Attempt 1 failed. Trying alternative...
    echo.
    echo Attempt 2: Using node directly...
    node node_modules/react-scripts/bin/react-scripts.js start
)

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Both attempts failed. Please check Node.js installation.
    echo.
    echo Try running: npm install
    echo Then: npm start
    pause
)
