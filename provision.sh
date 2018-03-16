# Install package and restart container
docker exec -i opencpu-rstudio bash -c "R -e \"remove.packages('josephguillaume/breakdown')\""
docker exec -i opencpu-rstudio bash -c "R -e \"devtools::install_github('josephguillaume/breakdown')\""
docker stop opencpu-rstudio
docker start opencpu-rstudio; docker exec opencpu-rstudio rm /run/apache2/apache2.pid