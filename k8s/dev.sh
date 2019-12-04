##### deploy to chongqing region

cat << EOF > ./k8sconf
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUN5RENDQWJDZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRFNE1USXdNekE1TXpNd05Gb1hEVEk0TVRFek1EQTVNek13TkZvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTTRvCmUyNWJMazlvUHlCb3ZyMXVmWnd2K2l2STBYOHphVVpCMUU0WEFZTzBKZUxKVERxOG1POTNLbTA0L2tkZ3dxdFAKTGltUzB5YkdaNHZhV2plRHpBYjJZaWRyQmtwMnRVVVUrd2g5dVJrRUg4blZ3T1h6em80eFZkOXplS3ZUWnBNeQpYSDduQ3FiMGVya1M2OElUYXI4WkU3dGE2cFc3YTVFTzJLSVJPS3RsYlgzZU1KS1pERUpMVEliSjV3V1JmVnRJCnlDVTJXQm40WnY4eXNaTEVTdm9kem51a1BBOUlHcTJaaTRNK2wrNVlFYmFid0o4ZXlHdUxZTGMrZk8yMUpaOUkKeGgvZGpJNkxDMFhTb1c1bmRGNVAyMDR6N2dHa2Y0cXNjMTMyRXlzdDA1TWpYOTdlNVk2WElpZDVtRjdXcjhYeAp3UlZhcWxqQmIzOXVyNTV3ZUQ4Q0F3RUFBYU1qTUNFd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZNQU1CQWY4d0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFJdGF1SkdEa28vZDdpZ3B4bW5kNENIbzdaUUUKd0lGY09wdkxwT2x6Q0RreUt1TWZXOFhWTU5CcTZ3THZpL3dQT0JjNDZJeEI4U3JiTnc5c204UDhVeWphV3d4bgpibTJUcCtnb2xtUzJNUDVaUkF4NXRWakVoV1ArMjF1ZHJNbUxZeFBlTUlwY0pteEsyeUNhOGVNMTNxVkxLQVNFCjBUSkc2WkVYUXdxWHVYUmltTm5FL1laY05FMTlCOENBclFTSVdkQzdKaTcvK3FPSXVEbFhMRkIxaXZSVGpZdUkKVGJ5ZUFiQlJpVUtUQjg1Qmgrd1Y0K2pkaEZ2YWh1NlN3ZTZVMS9TaDZFQ05UcloydXJGZVhQVjZKZDZCSjNoSgpOVmV4R1N1d0VqajFsNEM4VTNjQnJYdkFmaWZ6eGpIWVJLVGlick1qMkJTNnNPU3BwOC9nV3ZJSmhlUT0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
    server: https://10.216.155.27:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
current-context: kubernetes-admin@kubernetes
kind: Config
preferences: {}
users:
- name: kubernetes-admin
  user:
    client-certificate-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUM4akNDQWRxZ0F3SUJBZ0lJZStvL0dkSXNyMTR3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB4T0RFeU1ETXdPVE16TURSYUZ3MHlNREE0TURZd01qRXlNRFJhTURReApGekFWQmdOVkJBb1REbk41YzNSbGJUcHRZWE4wWlhKek1Sa3dGd1lEVlFRREV4QnJkV0psY201bGRHVnpMV0ZrCmJXbHVNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQXc1M2NRM2pSZ0lTclR2bkgKek9xdkE0K3YwUUFhTENkbFp4bTFWMmhYdzNiMzc5WFJQNkJwRFRZV2FZVEk1MXhvSWJtSFVWZkwrWENHZlhjcQpnOWYyZnh1dGwvSDNFbXo2ZWxmUG1vREFGam1YOFpaRGVNNlhGdUNMa0wyZVZiZTYyVzl3ejRuVHVXWk9CdFZoCjZvaUZ0Umw4SlpxT3owUTlDdEZZQklyRzZHZ2c5bFdUNXZWc1ZwQWxhck1HNExDU2FCWFF6QTRkN3dzbDgyWUEKdDE0UVY2TEFrRU9pSmlqeVNTL0d4Qm40aWZDYW9QR1VXY0IzV01VUFlUdUdSVG5mMlU5OWxaMXBtN0RrUnBCMApVK0JYVnUxbmhmMkVxb09GUWNjNkdyRlZzbSttSmgrMVRzN2UwbjVuVDF1VDI2aEkrZmVrakRYUSs0V0dIQ2IxCkVsTWJnd0lEQVFBQm95Y3dKVEFPQmdOVkhROEJBZjhFQkFNQ0JhQXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUgKQXdJd0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFGVXgwdDZkOWJxakdkRzRITytJbVFwQnZBbHdLZk82YmF6YgpkQkJqejFzc0dweWxiZHl2OFRvQ1Z5dTFwSDhNTnZIUlBpa2pWbTN5SklwZS9tamxXMXM3bjV2NmdTNno1S3BvCkNuWmN5UTluSDFlN0F2UzZVdEl4eXoybWhFSEJQZ2k4OTIwVlN5bEl4NjUzN1VqZUZPSjY2QU1wZi9GNVFXK2wKdnJaeHVpS0tLenNPNWpWU0pxNnJFbndmeWVQTnNoNGUxQnM5aWRmb002YmU1dGZuTUZIK29Fc21EWU5DcE1Iawpoc0xKQWZyOVNNMml6OHFlVGRXa1pST3pFejEwcDBWQXRrQTdWZ3ZTeGp5eE01akJoREUzSHBLci82RVVka29SClpHeXJMVGlFS0hScXp2R1ZXWW1TZnFxRkUwbVJGYWN1NXhpdGdrSVZ3OTI0Vk9lZXpaOD0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
    client-key-data: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcFFJQkFBS0NBUUVBdzUzY1EzalJnSVNyVHZuSHpPcXZBNCt2MFFBYUxDZGxaeG0xVjJoWHczYjM3OVhSClA2QnBEVFlXYVlUSTUxeG9JYm1IVVZmTCtYQ0dmWGNxZzlmMmZ4dXRsL0gzRW16NmVsZlBtb0RBRmptWDhaWkQKZU02WEZ1Q0xrTDJlVmJlNjJXOXd6NG5UdVdaT0J0Vmg2b2lGdFJsOEpacU96MFE5Q3RGWUJJckc2R2dnOWxXVAo1dlZzVnBBbGFyTUc0TENTYUJYUXpBNGQ3d3NsODJZQXQxNFFWNkxBa0VPaUppanlTUy9HeEJuNGlmQ2FvUEdVCldjQjNXTVVQWVR1R1JUbmYyVTk5bFoxcG03RGtScEIwVStCWFZ1MW5oZjJFcW9PRlFjYzZHckZWc20rbUpoKzEKVHM3ZTBuNW5UMXVUMjZoSStmZWtqRFhRKzRXR0hDYjFFbE1iZ3dJREFRQUJBb0lCQVFDNWF1QmxkQmZnNGVBZgpNOU9YQUx4emU3Y0RQRDJTcktVSlhPenV0UkM3VGdFbGJGNnpHTEY2dkZIeUl0THJ1a05aOUNtM2lLam0veW43CnN3Q3hoL3MxOEY1VE1COHBiL0xjRkcvTDIwNDN3cytyUnVzZGozVFhVbS8zK2tRaXE4eUlYWUZvdHhQaElIL0YKS20xdGlZcHpabnl1aUJubGpLRHZxQTd0L3owYS9EQW9aUXBnUmx6dXFMQkZCbEx4UzRTNUNKRUFJWEp2ZFZoYwpYOTFZbFdoSWF0bEJsSEZscGhEdVl1UVd5NS9WR3oyeEVnRWFJNVI2czZDdDdtbFFmaHpRVWF0OTFsMnE2Yy9nCm5Fb055UEN0MjlaaUtjbG81cURrcGo1S0Q0VmY1YjgyU1ZVRDUwYkFKbkZNWDhXZ1lsM0FJL0g3VWl0dU13V2wKdnRVZGYxaEJBb0dCQU9VZ3NHZ01RMXE3b21WSTkyNXE4RGVsQi9VQXBsTDRhMjRabkdwa1VtQ29CVWp3WUNVdwp3dTljc2RsY093R2tHc0FHcWlLZCtaQktsdDIrNFZuZVlaYm8vbmxqK1pWQlpnV3B6aGxjRm5HcGxtdHdNNUZRCmpFeHlHZXY4WGdIMUU4a2hyY3FLWmtBUjhTZXhHUnZVdWZia3FocDQ2WWsvQTJDcTMrN2lCZ290QW9HQkFOcVAKQ2RBRDV6RkVaWGFmSGhyN3pyUTRNOE9QVTZ2blF2SVpVUlNYZWcraUZjdVRzeVRrS0grR3M5cUNCQ0FqYUdNYgpjMkhielpGZ29sUHFPaW9JVTZHSUN5UDZQc3k3VWh4emY1M0E0a1JtZ1VRSHp6NW8xWll5aFJyQW11L1pBYXBVCkIxRURob3RtN0E5T3pTQTdRSHhXbzYxYXloZk1lTE9RK1lEcGtMcHZBb0dCQUx6RHVaRit5TjZ2UnBMN0VoMjkKckRtcmxHcWNKbXFranAwZUxHYmFUNk9oeVBqV1Q5OVQxTVV1TUxkSjdMTGxaOFJidVQ3YnR3YlE3SW16QUNUeAp1S1NEUDJMeW9tUDhoUGlWZEY0Z0o3MXNZYWdSditvdjJlWUErcW9ZTjdxVkZiL1dKejk5MWM5aStMSWlqUFVJCnhFeExCbmpZdEUyRnhGcVhhL1Y1OEUvaEFvR0FkL0l1WVhIeTdLL3J1MGtpSFk3Nlp4KzlFT05VK1MvSEp0VE0KRWEvOE5oNHZOZldPU0gzSzJBb1dKS0pjSDBNdlk4eko2dmZWZnFaNUQvS3BEeTVZcjNyWkdscVpJb1RmVUd2MgpxcDRUejVRdDl5Y09EdU03N04wMi9YS2MxV3JVSmlWTmlxR1RzbWUrdjd2d2lYTGJOaUhhWENaS2FQczNkdHptCmdXQXRwSk1DZ1lFQXB1ZzNEVVpoUmZCeHBKdm4yTnJTT1VyYzJBZlUreDN6ZVlOT2FTUVc0cWM5SmpTNjdyL1EKbitqc1VzZ1RPbG90YVRNR0JMbzNMekU0MVdqZTZUL3lEaUlMQ21US1lza0xMRlRFMUd0dDI1RkppdTFweVZYWAp0VHg3dFBFK1R5MDBKVjJDSnBOdGpSaVN6YVZSRTREeHBGdHVBa2xiVm9PSS9VZm9QRDhIaUpnPQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=
EOF

kubectl --kubeconfig=./k8sconf set image deployment/manager mw-front=${2}