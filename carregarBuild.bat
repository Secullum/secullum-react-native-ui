@echo off
call yarn build
xcopy /S /I /E /Y .\lib D:\Repositorios\SPRINT\pontoweb\src\Secullum.PontoWeb.Mobile\node_modules\secullum-react-native-ui\lib