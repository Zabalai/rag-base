ui = true

storage "raft" {
  path = "/vault/raft"
  node_id = "node1"
}

cluster_addr  = "http://vault.localhost.com:8201"
api_addr      = "http://vault.localhost.com:8200"
disable_mlock = true

listener "tcp" {
  address = "0.0.0.0:8200"
  tls_disable = 1
}
