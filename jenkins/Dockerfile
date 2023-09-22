FROM jenkins/jenkins:lts
USER root

RUN apt-get update
RUN apt-get install -y sudo
RUN sudo apt-get update && sudo apt-get install -yqq daemonize dbus-user-session fontconfig
RUN  sudo daemonize /usr/bin/unshare --fork --pid --mount-proc /lib/systemd/systemd --system-unit=basic.target
RUN exec sudo nsenter -t $(pidof systemd) -a su - $LOGNAME
RUN sudo apt update
RUN sudo apt install snapd

RUN apt-get update
RUN apt-get remove docker-ce

RUN apt-get update && \
                          apt-get -y install \
                              ca-certificates \
                              curl \
                              gnupg \
                              lsb-release && \
                          mkdir -p /etc/apt/keyrings && \
                          curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
                          echo \
                            "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
                            $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null && \
                          apt-get update && \
                          apt-get -y install docker-ce docker-ce-cli containerd.io docker-compose-plugin

                      RUN groupadd -f docker \
RUN apt-get install sudo
RUN sudo apt-get install -y snapd
RUN sudo apt-get update && sudo apt-get install -yqq daemonize dbus-user-session fontconfig
RUN sudo daemonize /usr/bin/unshare --fork --pid --mount-proc /lib/systemd/systemd --system-unit=basic.target
RUN sudo apt-get install -y vim
RUN usermod -aG docker jenkins