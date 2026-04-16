@echo off
set "NODE_PATH=%~dp0temp_node\node-v20.12.2-win-x64"
set "PATH=%NODE_PATH%;%PATH%"
echo Starting Langy Local Server...
npm run dev
pause
