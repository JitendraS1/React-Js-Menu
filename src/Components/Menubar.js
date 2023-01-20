import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Menubar() {
  const sidebarRef = useRef(null);
  const sidebarBtnRef = useRef(null);
  const [menuData, setMenuData] = useState([]);
  // const [isSubmenuOpen, setSubmenuOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(false)

  const handleArrowClick = (e, id) => {
    // e.stopPropogation();
    // setSubmenuOpen(!isSubmenuOpen);
    if (activeMenuId === false) {

      setActiveMenuId(id);
    } else {
      setActiveMenuId(false)
    }


  }

  const handleSidebarBtnClick = (e) => {

    sidebarRef.current.classList.toggle("close");
  }



  useEffect(() => {
    axios.get('https://gist.githubusercontent.com/lakehouseadmin/800fdf1f30cf202172a55d5c1daa1290/raw/b2b92dd9b051e7b2d4b916d2873c06a7aa1b9699/sidebar.json')
      .then(response => {
        // console.log(response?.data.data)
        setMenuData(response?.data?.data);
      });
  }, [])

  return (

    <main>


      <div className="sidebar" ref={sidebarRef}>
        <div className="logo-details">
          <i className='bx bxl-react'></i>
          <span className="logo_name">Reacte Menu</span>
        </div>
        <ul className="nav-links">{
          menuData?.map(item => {
            return <li key={item.category.id} onClick={(e) => handleArrowClick(e, item.category.id)} >
              <div className="iocn-link">
                <div className='cate-wrapper'>

                  <i><img src={item.category.ui_info.icon} alt="" /></i>
                  <span className="link_name" >{item.category.name}</span>

                </div>
                <i className='bx bxs-chevron-down arrow' ></i>
              </div>
              <ul className={`sub-menu ${activeMenuId === item.category.id ? ' showMenu' : ''}`}>
                <li><a className="link_name" href="#">{item.category.name}</a></li>
                {item.sub_categories.map((subItem, index) => <li key={item.category.id + "sub_category_" + index}><a href={subItem.action_url}>{subItem.name}</a></li>)}
              </ul>
            </li>

          })
        }
          <li>
            <div className="profile-details">
              <div className="profile-content">
                <img src="https://media.discordapp.net/attachments/1064994063268462735/1065020319473082448/jitendrasingh_cyberpunk_neonkid_bk--v_4_bc389413-7dfa-4e09-b4fe-914b0d6a8428.png?width=555&height=555" alt="profileImg" />
              </div>
              <div className="name-job">
                <div className="profile_name">Jitendra</div>
                <div className="job">Web Devloper</div>
              </div>
              <i className='bx bx-log-out' ></i>
            </div>
          </li>
        </ul>
      </div>
      <section className="home-section" >
        <div className="home-content">
          <i className='bx bx-menu' ref={sidebarBtnRef} onClick={handleSidebarBtnClick} />
          <span className="text">React JS Menubar</span>
        </div>
      </section>

    </main>
  )
}

export default Menubar
