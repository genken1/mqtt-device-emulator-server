## Подписка на топик с данными по оборотам двигателя
mosquitto_sub -h mqtt.cloud.yandex.net \
-p 8883 \
--cafile certificates/authority-certificate/rootCA.crt \
--cert certificates/registry/cert.pem \
--key certificates/registry/key.pem \
-t '$devices/DEVICE-ID/events' \
-q 1
