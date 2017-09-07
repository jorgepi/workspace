# Vault Image Build taken from an official repo with some changes:

* Configfile to deploy a non dev Vault server
* TLS enabled

Create the image:
# docker build -t tes/vault .

Deploy a container:
# docker run -d -p 8200:8200 --name vault tes/vault

Once deployed, we have to initialise vault, unseal and login:
--> Initialise Vault server 
	# export VAULT_ADDR=https://vault.tes.com:8200  (add this to your hosts file --> 127.0.0.1   vault.tes.com)
	# vault init --ca-cert /vault/certs/rootCA.pem
--> Unseal Vault server (use the unseal keys previously prompted)
	# vault unseal --ca-cert /vault/certs/rootCA.pem "[unseal key 1]"
	# vault unseal --ca-cert /vault/certs/rootCA.pem "[unseal key 2]"
	# vault unseal --ca-cert /vault/certs/rootCA.pem "[unseal key 3]"
--> Login with the admin token to start writing secrets
	# vault auth --ca-cert /vault/certs/rootCA.pem "[admin_token]"
