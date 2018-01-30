@servers(['web' => ['root@surge4.com']])

@task('deploy', ['on' => 'web'])
cd /var/www/passport
git fetch --all
git reset --hard origin/master
composer install
php artisan migrate --force
php artisan cache:clear
php artisan config:cache
php artisan route:cache
npm install
npm run production
@endtask

