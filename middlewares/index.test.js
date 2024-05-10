/*
test용 파일은 파일명과 확장자 사이에 test || spec을 넣는다.
jest는 파일명에 test나 spec이 들어간 파일을 전부 찾아서 실행한다.
*/

const {isLoggedIn, isNotLoggedIn} = require('./');

describe('isLoggedIn',()=>{ //테스트를 그룹화. 첫번째 인수는 그룹에 대한 설명.

    /*mocking: 가짜 객체, 가짜 함수를 넣는 행위*/
    /*req, res, next를 모킹 */
    //함수 모킹 시 fn메서드 사용
    const res = {
        status: jest.fn(()=>res), //메서드 체이닝이 가능하도록 설정
        send:jest.fn(),
    };
    const next = jest.fn();

    test('로그인 되어 있으면 isLoggedIn이 next를 호출해야한다.',()=>{
        const req = {
            isAuthenticated: jest.fn(()=>true),
        };
        isLoggedIn(req,res,next); 
        //toBeCalledtimes는 정확하게 몇 번 호출 되었는지를 체크.
        expect(next).toBeCalledTimes(1);
    });

    test('로그인 되어 있으면 isLoggedIn이 에러를 응답 해야한다.',()=>{
        const req={
            isAuthenticated: jest.fn(()=>false),
        };
        isLoggedIn(req,res,next);
        //toBeCalledWith 특정 인수와 함계 호출되었는지 체크 res.status(403).send('로그인 필요');
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalledWith('로그인 필요');
    });
});

describe('isNotoggedIn',()=>{
    const res = {
        redirect:jest.fn(),
    };
    const next = jest.fn();

    test('로그인 되어 있으면 isNotLoggedIn이 에러를 응답해야한다.',()=>{
        const req={
            isAuthenticated:jest.fn(()=>true),
        };
        isNotLoggedIn(req,res,next);
        const message=encodeURIComponent('로그인한 상태입니다.');
        expect(res.redirect).toBeCalledWith(`/?error=${message}`);
    });
    test('로그인 되어 있으면 isNotLoggedIn이 next를 호출해야한다.',()=>{
        const req={
            isAuthenticated:jest.fn(()=>false),
        };
        isNotLoggedIn(req,res,next);
        expect(next).toHaveBeenCalledTimes(1);
    });
});