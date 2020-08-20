pipeline {
  agent {
    docker {
      image 'node:current-alpine'
    }

  }
  stages {
    stage('test stage') {
      agent {
        docker {
          image 'angular/ngcontainer:latest'
        }

      }
      steps {
        sh '''echo \'hello world\'
ls'''
      }
    }

  }
}