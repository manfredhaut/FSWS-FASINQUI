{ pkgs, ... }: {
  # Canal Nix para garantir pacotes reproduzíveis.
  # Recomenda-se usar um canal estável como 'stable-24.05'.
  channel = "stable-24.05";

  # Pacotes de sistema necessários para o ambiente de desenvolvimento.
  packages = [
    pkgs.nodejs_20  # Backend Runtime
    pkgs.docker-compose # Orquestração de contêineres
    pkgs.postgresql_16 # Pacote de cliente para interagir com o banco de dados
    pkgs.influxdb # Pacote de cliente para o banco de séries temporais
  ];

  # Habilita o daemon do Docker diretamente no workspace do IDX.
  # Essencial para executar os contêineres de produção localmente.
  services.docker.enable = true;

  # Hooks do ciclo de vida do workspace.
  idx = {
    workspace = {
      # Comandos a serem executados na criação do workspace.
      onCreate = {
        # Instala as dependências do backend
        backend-npm-install = "cd backend && npm install";
        # Instala as dependências do frontend
        frontend-npm-install = "cd frontend && npm install";
      };
      # Comandos a serem executados na inicialização do workspace.
      onStart = {
        # Sobe os serviços de banco de dados e API em background.
        # O '--build' garante que as imagens sejam reconstruídas se o Dockerfile mudar.
        start-services = "docker-compose up -d --build";

        # Inicia o servidor de desenvolvimento do backend em modo de observação.
        # O '&' no final executa o comando em background.
        start-backend-dev = "cd backend && npm run dev &";
      };
    };
    
    # Configura o preview da web para a aplicação frontend.
    previews = {
      enable = true;
      previews = {
        web = {
          # O comando inicia o servidor de desenvolvimento do Vite no diretório 'frontend'.
          # O '$PORT' é uma variável de ambiente fornecida pelo IDX para a porta do preview.
          # O '--host' garante que o servidor seja acessível de fora do contêiner.
          command = ["sh" "-c" "cd frontend && npm run dev -- --port $PORT --host"];
          manager = "web";
        };
      };
    };

    # Extensões do VS Code para melhorar a produtividade.
    extensions = [
      "dbaeumer.vscode-eslint"
      "esbenp.prettier-vscode"
      "ms-azuretools.vscode-docker"
      "eamodio.gitlens"
    ];
  };
}
