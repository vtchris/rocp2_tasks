pipeline {
  agent any
  stages {
    stage('Build Angular') {
      agent {
        docker {
          image 'node:12.18-alpine'
          args '--mount type=bind,source=/home/ec2-user/deploy,target=/deploy'
        }

      }
      when {
        expression {
          env.BRANCH_NAME == 'master' || env.CHANGE_TARGET == 'master'
        }

      }
      steps {
        sh '''cd client
npm i 
npm run build
cp dist/rocp2_tasks/* /deploy'''
      }
    }

    stage('Deploy to S3') {
      agent {
        docker {
          image 'amazon/aws-cli'
          args '--mount type=bind,source=/home/ec2-user/deploy,target=/deploy --interactive --entrypoint=""'
        }

      }
      steps {
        sh 'aws s3 cp /deploy s3://tasker-bucket --recusive --acl public-read '
      }
    }

  }
}