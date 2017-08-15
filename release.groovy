#!/usr/bin/groovy
def call(body) {
    def config = [:]
    body.resolveStrategy = Closure.DELEGATE_FIRST
    body.delegate = config
    body()

    def containerName = config.containerName ?: 'clients'
    def releaseVersion = config.version

    sh "git remote set-url origin git@github.com:stakater-spring-microservice/MovieManager.git"
    sh "git config user.email admin@stakater.com"
    sh "git config user.name stakater-release"
    sh 'chmod 600 /root/.ssh-git/ssh-key'
    sh 'chmod 600 /root/.ssh-git/ssh-key.pub'
    sh 'chmod 700 /root/.ssh-git'

    container(name: containerName) {

//    sh "git tag ${env.JOB_NAME}-${config.version}"
//    sh "git push origin --tags"
//        sh "git push origin ${env.JOB_NAME}-${config.version}"
        sh "git tag -fa v${releaseVersion} -m 'Release version ${releaseVersion}'"
        sh "git push origin v${releaseVersion}"
    }
}
