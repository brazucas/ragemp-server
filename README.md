<table>
    <td><img src="https://github.com/brazucas/ragemp/raw/master/demo/demo2.jpeg" width="300px"/></td>
    <td><img src="https://github.com/brazucas/ragemp/raw/master/demo/demo3.png" width="300px"/></td>
    <td><img src="https://github.com/brazucas/ragemp/raw/master/demo/demo4.png" width="300px"/></td>
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

##### Roadmap

É possível acompanhar como está o desenvolvimento de todas as funcionalidades que existirão através da nossa página de [projetos](https://github.com/brazucas/ragemp/projects).

##### Posso entrar no time de testes?
Atualmente nosso time de testes está cheio.

##### Posso entrar no time de desenvolvimento?

Claro! o projeto é de código aberto e qualquer um pode contribuir, basta fazer um fork e pull requests.

# Abrindo o servidor local

1. Faça clone do projeto.
2. Faça uma cópia do arquivo ```conf.json.dist``` para ```conf.json```.
3. Abra as portas 22005/udp e 22006 no seu firewall.
4. Baixe e instale o Docker: https://docs.docker.com/install/

6. Execute o arquivo utilizando o seguinte comando:
    > docker-compose -f docker/ragemp.yml up -d
    
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
2. Instale o NodeJS, NPM, Typescript, Docker e o Angular CLI.
     
     - NodeJS: https://nodejs.org/en/download/
     - NPM: https://docs.npmjs.com/cli/install
     - Typescript: Basta executar o comando ```npm i typescript -g```.
     - Angular CLI: Basta executar o comando ```npm i @angular/cli -g```.
     - Docker: https://docs.docker.com/install/
3. Faça instalação dos pacotes:
    > npm install
    
4. Inicialize o Docker

5. Suba os containers do Docker responsáveis pelo o ambiente de desenvolvimento:
    > docker-compose up -d
    
    Acesse o link: http://localhost:4200/ para acessar o projeto. A página de login, por exemplo, pode ser vista em: http://localhost:4200/#/login.

6. Para fazer a build do código client-side para ser utilizado no servidor, execute o seguinte comando:
    > docker exec -it ragemp_ragemp_browser_server_1 bash -c "ng build --output-path=../client_packages/browser/ --prod"

6. Para parar os containers do Docker execute o seguinte comando:
    > docker-compose down 
