# Install package and restart container
docker exec -i opencpu-rstudio bash -c "R -e \"remove.packages('roaldl/breakdown')\""
docker exec -i opencpu-rstudio bash -c "R -e \"devtools::install_github('roaldl/breakdown')\""
docker exec -i opencpu-rstudio bash -c "R -e \"library(opencpu); ocpu_start_app('breakdown')\""