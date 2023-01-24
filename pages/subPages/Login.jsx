/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import {
  loginWithGoogle,
  loginWithMeta,
  logout,
  onUserStateChange,
  submitWithStandard,
} from '../../src/components/api/firebase';
import AvatarImage from '../../src/components/atoms/AvatarImage';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../src/components/api/firebase';
const Login = () => {
  // 로그인한 사용자의 정보
  const [user, setUser] = useState(); // null, undefined 초기값
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);

  // // email과 비밀번호로 로그인
  // const firebaseAuthentication = firebaseAuth;
  // const sample = async () => {
  //   try {
  //     const user = await createUserWithEmailAndPassword(
  //       firebaseAuthentication,
  //       email,
  //       password,
  //     );
  //     console.log(user);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // 현재 로그인 한 사용자 가져오기, 렌더링 시 null값 되는 것 방지
  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  // 로그인 , 로그아웃 다루는 메서드입니다
  const handleGoogleLogin = () => {
    // firebase login이 성공하게 되면 user의 정보를 받아옵니다.
    loginWithGoogle();
  };

  const handleMetaLogin = () => {
    loginWithMeta();
  };

  const handleLogout = () => {
    // firebase logout이 성공하게 되면 null를 받아옵니다.
    logout();
  };

  // email 존재 유무에 따라 value값을 이메일과 패스워드에 할당
  const handleChange = (e) => {
    const {
      target: { name, value },
    } = e;
    name === 'email' ? setEmail(value) : setPassword(value);
  };

  // 기존 사용자와 신규 사용자 submit 제어
  const handleSubmit = (e) => {
    e.preventDefault();
    submitWithStandard();
  };

  return (
    <div
      css={{
        display: ' flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#3C6255',
      }}
    >
      <div
        css={{
          padding: '50px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '10px 10px 5px -2px rgba(0,0,0,0.07)',
          WebkitBoxShadow: '10px 10px 5px -2px rgba(0,0,0,0.07)',
          MozBoxShadow: '10px 10px 5px -2px rgba(0,0,0,0.07)',
        }}
      >
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            marginBottom: '0px',
          }}
        >
          <img css={{ marginBottom: '2rem' }} />
          <h2 css={{ marginBottom: '0.5rem' }}>로그인</h2>
          <p css={{ marginTop: '0.5rem', marginBottom: '2rem', color: 'gray' }}>
            PlayBook Account(으)로 계속 이동
          </p>
        </div>
        <div css={{ display: 'flex', flexDirection: 'column' }}>
          {!user && (
            <form>
              <input
                css={{
                  width: '450px',
                  height: '36px',
                  border: '1px solid gray',
                  borderRadius: '4px',
                  marginBottom: '1rem',
                  textIndent: '1rem',
                  fontSize: '16px',
                }}
                type='email'
                name='email'
                placeholder='이메일을 입력해주십시오'
                required
                value={email}
                onChange={handleChange}
              />
              <div>
                <input
                  css={{
                    width: '450px',
                    height: '36px',
                    border: '1px solid gray',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    textIndent: '1rem',
                    fontSize: '16px',
                  }}
                  type='password'
                  name='password'
                  placeholder='비밀번호를 입력해주십시오'
                  required
                  value={password}
                  autoComplete='on'
                  onChange={handleChange}
                />
              </div>
              <div
                css={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <input
                  css={{
                    width: '455px',
                    height: '40px',
                    border: 'none',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    fontSize: '16px',
                    color: 'white',
                    backgroundColor: '#A3BB98',
                  }}
                  type='submit'
                  // onClick={sample}
                  value={'로그인'}
                />
              </div>
            </form>
          )}
          {!user && (
            <input
              css={{
                display: 'flex',
                justifyContent: 'center',
                width: '450px',
                height: '42px',
                border: '1px solid gray',
                borderRadius: '4px',
                marginBottom: '1rem',
                textAlign: 'center',
                fontWeight: 'semi-bold',
                fontSize: '16px',
                cursor: 'pointer',
              }}
              placeholder='Google(으)로 계속하기'
              onClick={handleGoogleLogin}
            ></input>
          )}
          {!user && (
            <input
              css={{
                width: '450px',
                height: '42px',
                border: '1px solid gray',
                borderRadius: '4px',
                marginBottom: '1rem',
                textAlign: 'center',
                fontWeight: 'semi-bold',
                fontSize: '16px',
                cursor: 'pointer',
              }}
              placeholder='Meta / FaceBook(으)로 계속하기'
              onClick={handleMetaLogin}
            ></input>
          )}
          {user && (
            <button
              css={{
                width: '70px',
                height: '70px',
                border: 'none',
                borderRadius: '50%',
                top: '2rem',
                padding: '0',
                cursor: 'pointer',
              }}
              onClick={handleLogout}
            >
              <AvatarImage user={user} />
            </button>
          )}
        </div>
        <div css={{ textAlign: 'left', marginTop: '4rem' }}>
          <span css={{ color: 'gray' }}>플레이북 이용이 처음이십니까?</span>
          <span
            css={{
              marginLeft: '1rem',
              color: '#658864',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            {newAccount ? '회원가입' : '로그인'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
