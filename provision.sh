# Install package and restart container
docker exec -i opencpu-rstudio bash -c "R -e \"remove.packages('josephguillaume/breakdown')\""
docker exec -i opencpu-rstudio bash -c "R -e \"devtools::install_github('josephguillaume/breakdown')\""
docker exec -i opencpu-rstudio bash -c "R -e \"library(opencpu); ocpu_start_app('breakdown')\""