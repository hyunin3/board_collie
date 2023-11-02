FROM nginx
WORKDIR /app
RUN mkdir ./build
ADD ./build ./build
# 기본 nginx 설정 파일 제거 후 커스텀 설정 파일 적용하라는 뜻
RUN rm -rf /etc/nginx/nginx.conf
COPY ./react-nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]