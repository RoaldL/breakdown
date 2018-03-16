# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "ubuntu/trusty64"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  config.vm.network "forwarded_port", guest: 8004, host: 8004
  
  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # In our case, using VirtualBox:
  config.vm.provider "virtualbox" do |vb|  #
    # Customize the amount of memory on the VM:
    vb.memory = "3584"
  end

  # Provision the docker container that runs the OpenCPU server with breakdown
  # web tool.  
  config.vm.provision "docker",
    images: ["opencpu/rstudio"]
  
  config.vm.provision "docker" do |d|
	  d.run "opencpu/rstudio", args: "-t -p 8004:8004"
  end
  
  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available.
  config.vm.provision "shell", path: "provision.sh"
end