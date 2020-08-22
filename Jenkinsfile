pipeline {
  agent any
  stages {
    stage('Build Angular') {
      agent {
        docker {
          image 'node:12.18-alpine'
        }

      }
      when  {         
        expression { env.BRANCH_NAME == 'master' || env.CHANGE_TARGET == 'master' }       
      }
      steps {
        sh '''cd client
npm i 
npm run build'''
      }
    }

  }
}
