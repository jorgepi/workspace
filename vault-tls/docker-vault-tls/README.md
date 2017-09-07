# Vault Image Build taken from an official repo with some changes:

* Configfile to deploy a non dev Vault server
* TLS enabled

# Create the image:
docker build -t client/vault .

# Deploy a container:
docker run -d -p 8200:8200 --name vault client/vault

Once deployed, we have to initialise vault, unseal and login:

--> Initialise Vault server 

	# export VAULT_ADDR=https://vault.client.com:8200  (add this to your hosts file --> 127.0.0.1   vault.client.com)
	# vault init --ca-cert /vault/certs/rootCA.pem

--> Unseal Vault server (use the unseal keys previously prompted)

	# vault unseal --ca-cert /vault/certs/rootCA.pem "[unseal key 1]"
	# vault unseal --ca-cert /vault/certs/rootCA.pem "[unseal key 2]"
	# vault unseal --ca-cert /vault/certs/rootCA.pem "[unseal key 3]"

--> Login with the admin token to start writing secrets

	# vault auth --ca-cert /vault/certs/rootCA.pem "[admin_token]"

# For CLIENT platform security purposes, we are going to create a Root CA and an Intermediate CA on Vault to request certificates dynamicly:

--> Mounting Vault PKI backend for our CLIENT Root CA:

	# vault mount -path=client-ca -description="CLIENT Root CA" -max-lease-ttl=87600h pki

--> Creating the CLIENT Root CA certificate:

	# vault write client-ca/root/generate/internal common_name="CLIENT Root CA" ttl=87600h key_bits=4096 exclude_cn_from_sans=true

-->Configure CA URL access:

	# vault write client-ca/config/urls issuing_certificates="https://vault.client.com:8200/v1/client-ca"

--> Mounting Vault PKI backend for our CLIENT Intermediate CA:

	# vault mount -path=client-in-ca -description="CLIENT Ops Intermediate CA" -max-lease-ttl=26280h pki

--> Generate an Intermediate CSR:

	# vault write client-in-ca/intermediate/generate/internal common_name="CLIENT Operations Intermediate CA" ttl=26280h key_bits=4096 exclude_cn_from_sans=true

--> We will cut and paste CSR into a new file client-in-ca.csr. The reason we output the file here is so we can get it out of one backend and into another and then back out:

	# vault write client-ca/root/sign-intermediate csr=@client-in-ca.csr common_name="CLIENT Ops Intermediate CA" ttl=8760h

--> Now that we have a Root CA signed cert, we’ll need to cut-n-paste this certificate into a file we’ll name client-in-ca.crt and then import it into our Intermediate CA backend:

	# vault write client-in-ca/intermediate/set-signed certificate=@client-in-ca.crt

--> Configure Intermediate CA URL access:

	# vault write client-in-ca/config/urls issuing_certificates="https://vault.client.com:8200/v1/client-in-ca/ca" crl_distribution_points="https://vault.client.com:8200/v1/client-in-ca/crl"

--> Requesting a certificate for a web server. First we will create a role named “web_server” on our Intermediate CA:

	# vault write client-in-ca/roles/db_server key_bits=2048 max_ttl=8760h allow_any_name=true

--> Now we can use that role to issue a cert:

	# vault write client-in-ca/issue/db_server common_name="db.client.com" ttl=720 format=pem

--> In case we want to save the Root CA cert content:

	# curl -s https://vault.client.com:8200/v1/client-ca/ca/pem > client_ca.pem

--> In case we want a client side authentication certificate for MongoDB we can follow these steps:

	# vault write --ca-cert /vault/certs/rootCA.pem client-in-ca/roles/mongodb_client key_bits=2048 max_ttl=8760h keyUsage=digitalSignature extendedKeyUsage=clientAuth client_flag="true" allow_subdomains="true" allow_any_name=true

	# vault write --ca-cert /vault/certs/rootCA.pem client-in-ca/issue/client_mongodb common_name="mongo-client"
