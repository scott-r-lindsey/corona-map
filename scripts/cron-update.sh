#!/bin/bash

set -o pipefail
set -e

__here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__root="$__here/../"

. $__here/credentials.sh

# update source data
cd $__root/data/COVID-19
git pull

#parse data
cd $__here
nodejs ./tabulate-full.js

# upload to s3
aws s3 sync $__root/public/data s3://corona-prod-react/data
