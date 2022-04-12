run:
    docker run -d -p 80:4200 express:test  -v expressTest:/app/data --rm --name express-test
stop:
    docker stop express-test
redis:
	docker run -d --name redisTest --rm -p 127.0.0.1:6379:6379 redis
