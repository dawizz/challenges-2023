# Challenge 1 - Express yourself

```bash
docker build -t challenge-1 . || exit 1
docker run --name challenge-1 -e "SECRET=p4ssw0rd_ch4ll3ng3_1" -p 3000:3000 -it --rm challenge-1
```

![Challenge 1](carbon.svg)
