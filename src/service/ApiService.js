import { API_BASE_URL } from "../app-config";

//클라이언트의 요청을 처리할 함수
//첫번째 매개변수른 작업
//두번째 매개변수가 전송 방식
//세번쨰 매개변수가 파라미터
export function call(api, method, request){
    let options = {
        headers:new Headers({
            "Content-Type":"application/json"
        }),
        url:API_BASE_URL + api,
        method:method,
    };
    if(request){
        options.body = JSON.stringify(request);
    }

    //요청
    return fetch(options.url, options)
    .then((response) => response.json()
    .then((json) => {
        if(!response.ok){
            return Promise.reject(json);
        }
        return json;
    })
    );
}