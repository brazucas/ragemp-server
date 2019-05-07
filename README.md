<table>
    <td><img src="https://github.com/brazucas/ragemp/raw/master/demo/demo2.jpeg" width="300px"/></td>
    <td><img src="https://github.com/brazucas/ragemp/raw/master/demo/demo3.jpeg" width="300px"/></td>
    <td><img src="https://github.com/brazucas/ragemp/raw/master/demo/demo4.jpeg" width="300px"/></td>
</table>

# Histórico

##### Sobre o Brazuca's

O Brazuca's é um servidor de jogo de uma modificação do jogo Grand Theft Auto: San Andreas chamado SA-MP (San Andreas Multiplayer), que permite que qualquer pessoa crie seu próprio servidor do jogo e outras pessoas possam jogar nele, utilizando uma API fornecida pelos desenvolvedores do mod. Mais informações em http://sa-mp.com. O Brazuca's surgiu em 2006 e passou por altos e baixos, até que em meados de 2014 passou a ficar praticamente sem jogadores.

O RageMP (Modificação do jogo GTA: V, que basicamente segue a mesma ideia do SA-MP) é a aposta do Brazuca's para continuar sendo um servidor de GTA popular, nosso objetivo é oferecer a melhor experiência de jogo possível, tanto para jogadores casuais como hardcore.

##### Porque não o GTA Network?
Nós iniciamos um projeto lá, mas depois de alguns meses houve um anúncio basicamente dizendo que o GTA Network seria integrado ao RageMP.

##### Expectativas

Nós não daremos dicas, anúncios ou data de lançamento enquanto o servidor não estiver completamente jogável. Tudo relacionamento ao desenvolvimento do servidor estará disponível apenas nesse repositório do GitHUB, sinta-se a vontade para fazer um fork ou "watch" no projeto.

##### Código-Aberto?

Nós manteremos o código aberto até o anúncio oficial da abertura do servidor, ou até mesmo depois disso.

##### Objetivo inicial

A primeira versão do servidor irá contemplar o RPG e os Minigames, nossa ideia, diferente de como era no SA-MP, é manter o servidor online 24/7 no mesmo modo de jogo. 

##### Posso entrar no time de testes?
Atualmente nosso time de testes está cheio.

##### Posso entrar no time de desenvolvimento?

Claro! o projeto é de código aberto e qualquer um pode contribuir, basta fazer um fork e pull requests.

# Abrindo o servidor local

1. Faça clone do projeto.
2. Faça uma cópia do arquivo ```conf.json.dist``` para ```conf.json```.
3. Abra as portas 22005/udp e 22006 no seu firewall.
4. Baixe e instale o Docker: https://docs.docker.com/install/
5. Crie um arquivo chamado ragemp.yml com o seguinte conteúdo:
    ```
    version: "3.2"
       
       services:
         server:
           image: brzserver/ragemp
           depends_on:
             - mysql
           ports:
             - target: 22005
               published: 22005
               protocol: udp
               mode: host
             - 22006:22006
           volumes:
             - /caminho/para/projeto/ragemp:/ragemp
           deploy:
             mode: replicated
             replicas: 1
             restart_policy:
               condition: on-failure
           networks:
             - ragemp
       
         mysql:
           image: mysql:5.6
           volumes:
               - /data/ragempdb:/var/lib/mysql
           ports:
             - 33010:3306
           environment:
             MYSQL_ROOT_PASSWORD: abcd1234
             MYSQL_DATABASE: BRAZUCAS
           deploy:
             mode: replicated
             replicas: 1
             restart_policy:
               condition: on-failure
           networks:
             - ragemp
       
       networks:
         ragemp:
    ```

6. Execute o arquivo utilizando o seguinte comando:
    > docker stack deploy -c /caminho/para/ragemp.yml ragemp
    
     Aguarde alguns minutos para que o Docker baixe as imagens e suba os containers.
    
7. Comandos úteis
    - Iniciar servidor: ```docker start ragemp_server```.
    - Parar servidor: ```docker stop ragemp_server```.
    - Reiniciar servidor: ```docker restart ragemp_server```.
    - Logs do servidor: ```docker service logs ragemp_server -f```.
    - Destruir o stack: ```docker stack rm ragemp```.

8. Acesse o servidor pelo RageMP utilizando a opção "Direct Connect", com o IP do seu computador.

# Contribuindo

1. Siga os passos para abrir o servidor local.
2. Instale o NodeJS, NPM, Typescript e o Angular CLI.
     
     - NodeJS: https://nodejs.org/en/download/
     - NPM: https://docs.npmjs.com/cli/install
     - Typescript: Basta executar o comando ```npm i typescript -g```.
     - Angular CLI: Basta executar o comando ```npm i @angular/cli -g```.
3. Faça instalação dos pacotes:
    > npm install
    
4. Para os passos a seguir, tenha como base que você esteja na pasta do projeto, e preste atenção na instrução "Mantenha uma sessão do terminal aberta".
5. Mantenha uma sessão do terminal aberta com o seguinte comando executando:
    > tsc -w
    
    Este comando irá compilar os arquivos ```.ts``` para ```.js``` a medida que são alterados.
6. Para qualquer alteração na pasta ```browser```:
    - Navegue até a pasta ```browser```:
        > cd browser
    - Compile o index.ts: (ignore qualquer erro apresentado)
        > tsc index.ts
    - Construa o projeto:
        > ng build --output-path=../client_packages/browser/ --prod

7. Para desenvolver as telas do navegador, navegue até a pasta ```browser``` e execute o seguinte comando:
    > ng serve
    
    Acesse o link: http://localhost:4200/ para acessar o projeto. A página de login, por exemplo, pode ser vista em: http://localhost:4200/#/login. 
