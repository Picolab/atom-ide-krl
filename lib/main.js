const {AutoLanguageClient} = require('atom-languageclient')

class KRLLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return [ 'source.krl' ] }
  getLanguageName () { return 'KRL' }
  getServerName () { return 'krl-language-server' }
  getConnectionType() { return 'ipc' }

  startServerProcess () {
    console.log("Hello World")
    return super.spawnChildNode([ require.resolve('../krl-language-server/out/server.js'), '--node-ipc' ], {
      stdio: [null, null, null, 'ipc']
    })
  }
}

module.exports = new KRLLanguageClient()
