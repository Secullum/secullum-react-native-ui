@echo off
call yarn build
xcopy /S /I /E /Y .\lib D:\Repositorios\SPRINT\AlteracaoLayout\pontoweb\src\Secullum.PontoWeb.Mobile\node_modules\secullum-react-native-ui\lib
xcopy /S /I /E /Y .\styles D:\Repositorios\SPRINT\AlteracaoLayout\pontoweb\src\Secullum.PontoWeb.Mobile\node_modules\secullum-react-native-ui\lib\styles
