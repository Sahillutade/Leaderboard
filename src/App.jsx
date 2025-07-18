import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import { UserSelector } from './components/user-selector'
import { LeaderBoard } from './components/leaderboard'
import { ClaimHistory } from './components/claim-history'
import { AddMember } from './components/add-member'

function App() {

  return (
    <div>
      <HashRouter>
        <header style={{marginTop:'20px',marginLeft:'100px', marginRight:'100px'}}>
          <div style={{display:'flex',justifyContent:'space-between',backgroundColor:'#f2f2f2',paddingTop:'10px',paddingBottom:'10px',paddingLeft:'20px',paddingRight:'20px',borderRadius:'10px',border:'1px solid #f2f2f2'}}>
            <div>
              <h2 className='text-warning'>LeaderBoard</h2>
            </div>
            <div style={{display:'flex',marginTop:'10px'}}>
              <div style={{marginRight:'80px'}}>
                <Link to={'/'} style={{textDecoration:'none',color:'black',fontWeight:'bold'}}>Home</Link>
              </div>
              <div style={{marginRight:'80px'}}>
                <Link to={'/LeaderBoard'} style={{textDecoration:'none',color:'black',fontWeight:'bold'}}>Leader-Board</Link>
              </div>
            </div>
            <div>
              <div>
                <Link to={'/Add-user'} className='bi bi-person-add' style={{border:'none',fontSize:'26px',backgroundColor:'unset',marginTop:'6px',color:'black'}}></Link>
              </div>
            </div>
          </div>
        </header>
        <section>
          <Routes>
            <Route path='/' element={<UserSelector />} />
            <Route path='/LeaderBoard' element={<LeaderBoard />} />
            <Route path='/History/:id' element={<ClaimHistory />} />
            <Route path='/Add-user' element={<AddMember />} />
          </Routes>
        </section>
      </HashRouter>
    </div>
  )
}

export default App
