# Vault Image Build taken from an official repo with some changes:

* Configfile to deploy a non dev Vault server
* TLS enabled

# Create the image:
docker build -t tes/vault .

# Deploy a container:
docker run -d -p 8200:8200 --name vault tes/vault

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

#For TES platform security purposes, we are going to create a Root CA and an Intermediate CA on Vault to request certificates dynamicly:

# Mounting Vault PKI backend for our TES Root CA:
vault mount -path=tes-ca -description="TES Root CA" -max-lease-ttl=87600h

# Creating the TES Root CA certificate:
vault write tes-ca/root/generate/internal common_name="TES Root CA" ttl=87600h key_bits=4096 exclude_cn_from_sans=true

# Configure CA URL access:
vault write tes-ca/config/urls issuing_certificates="https://vault.tes.com:8200/v1/tes-ca"

# Mounting Vault PKI backend for our TES Intermediate CA:
vault mount -path=tes-in-ca -description="TES Ops Intermediate CA" -max-lease-ttl=26280h pki

# Generate an Intermediate CSR:
vault write tes-in-ca/intermediate/generate/internal common_name="TES Operations Intermediate CA" ttl=26280h key_bits=4096 exclude_cn_from_sans=true

# We will cut and paste CSR into a new file tes-in-ca.csr. The reason we output the file here is so we can get it out of one backend and into another and then back out:
vault write tes-in-ca/root/sign-intermediate csr=@tes-in-ca.csr common_name="TES Ops Intermediate CA" ttl=8760h

# Now that we have a Root CA signed cert, we’ll need to cut-n-paste this certificate into a file we’ll name tes-in-ca.crt and then import it into our Intermediate CA backend:
vault write tes-in-ca/intermediate/set-signed certificate=@tes-in-ca.crt

# Configure Intermediate CA URL access:
vault write tes-in-ca/config/urls issuing_certificates="https://vault.tes.com:8200/v1/tes-in-ca/ca" crl_distribution_points="https://vault.tes.com:8200/v1/tes-in-ca/crl"

# Requesting a certificate for a web server. First we will create a role named “web_server” on our Intermediate CA:
vault write tes-in-ca/roles/web_server key_bits=2048 max_ttl=8760h allow_any_name=true

# Now we can use that role to issue a cert:
vault write tes-in-ca/issue/web_server common_name="vault.tes.com" ttl=720 format=pem

# In case we want to save the Root CA cert content:
curl -s https://vault.tes.com:8200/v1/tes-ca/ca/pem > tes_ca.pem

