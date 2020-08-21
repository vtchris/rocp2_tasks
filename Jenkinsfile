pipeline {
  agent any
  stages {
    stage('Build Angular') {
      agent {
        docker {
          image 'node:12.18-alpine'
        }

      }
      steps {
        sh '''cd client
npm i 
npm run build'''
      }
    }

  }
}