{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [
    pkgs.nodejs_20
    pkgs.docker-compose
    pkgs.postgresql_16
    pkgs.influxdb
  ];

  services.docker.enable = true;

  idx = {
    extensions = [
      "ms-azuretools.vscode-docker"
      "esbenp.prettier-vscode"
    ];

    workspace = {
      onCreate = {
        install-dependencies = "npm install --prefix backend && npm install --prefix frontend";
      };
      onStart = {};
    };

    previews = {
      enable = true;
      previews = {
        web = {
          command = ["tail" "-f" "/dev/null"];
          manager = "web";
          env = { PORT = "8000"; };
        };
      };
    };
  };
}