import React from 'react';
import './AdminPage.css';
const AdminPage = () => {
  return (
    <div style={{ marginTop: '200px'}}>
      {/* 매장 이름 */}
      <div style={{ textAlign: 'right' }}>
        <h1>능이버섯 보드카페 역삼점</h1>
      </div>

      {/* 튜토리얼 이탈률 */}
      <div>
        <h2>튜토리얼 이탈률</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '100px', height: '20px', backgroundColor: 'blue' }}>스플렌더</div>
          <div style={{ width: '80px', height: '20px', backgroundColor: 'green' }}>루미큐브</div>
          <div style={{ width: '50px', height: '20px', backgroundColor: 'red' }}>마헤</div>
        </div>
        <p>'스플렌더'에서는 세팅 단계에서 가장 많이 나갔어요!</p>
      </div>

      {/* 게임 인기 순위 */}
      <div>
        <h2>게임 인기 순위</h2>
        <ol>
        <li style={{ marginBottom: '5px' }}>스플렌더</li>
          <li style={{ marginBottom: '5px' }}>루미큐브</li>
          <li>마헤</li>
        </ol>
      </div>

      {/* 자주 묻는 질문 */}
      <div style={{ marginTop: '20px' }}>
        <h2>자주 묻는 질문</h2>
        <p>스플렌더에서 턴이 끝날때 15점을 동시에 달성한 플레이어가 있으면 우승자를 어떻게 결정해요?</p>
      </div>
    </div>
  );
}

export default AdminPage;
