breakdown
=========

Web tool to hierarchically break down and edit an analysis and identify breakeven or cross-over points. 

Based on opencpu in R. For more information and other implementations of crossover point scenarios, see https://github.com/josephguillaume/crossover

Try it online: http://josephguillaume.ocpu.io/breakdown/www/

Locally (automatically downloaded from github):
```
library(opencpu)
ocpu_start_app("josephguillaume/breakdown")
```

Locally with a local installation of the package
```
devtools::install_github("josephguillaume/breakdown")
library(opencpu)
ocpu_start_app("breakdown")
```

Locally with a [Vagrant](https://www.vagrantup.com/) virtual machine running the [Docker](https://www.docker.com/) container provided by [OpenCPU](https://www.opencpu.org/).

Clone or download the repository and run:
```
vagrant up
```
This will install the latest master version and run OpenCPU, after provision the tool can then be accessed through http://localhost:8004/ocpu/library/breakdown/www/

The breakdown version can always be updated using:
```
vagrant provision
```
