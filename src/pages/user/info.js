import React, { useEffect, useState } from "react"
import { connect } from "dva"
import { Select, Card, Input, Radio, Checkbox, Button, Form, Row, Col, List, Modal } from "antd"
import s from "./common.less"
import { useHistory } from "umi"

import t from "@/utils/t"
import Breadcrumbs from "@/components/common/breadcrumb"
import Uploader from '../../components/form/uploader'
import { EmailIcon, LockIcon, SmartphoneIcon, UserIcon, UserSettingsIcon } from "../../components/common/icons"

function Info({ getUserInfo, user }) {

  const [infoList, setInfoList] = useState([])
  const [usernameModify, setUsernameModify] = useState(false)
  const [avatarModify, setAvatarModify] = useState(false)
  const [phoneModify, setPhoneModify] = useState(false)
  const [passwordModify, setPasswordModify] = useState(false)


  useEffect(() => {
    transUserIntoList()
  }, [])

  function getLatestInfo() {
    getUserInfo(true)
  }

  function transUserIntoList() {
    setInfoList([
      {
        key: 'username', title: t('user.info.list.username'), value: user.username, icon: <UserIcon />,
        action: () => { setUsernameModify(true) }
      },
      { key: 'email', title: t('user.info.list.email'), value: user.email, icon: <EmailIcon />, color: 'rgb(233, 192, 28)' },
      {
        key: 'phone', title: t('user.info.list.phone'), value: user.phone, icon: <SmartphoneIcon />,
        color: 'rgb(44, 189, 233)', action: () => { setPhoneModify(true) }
      },
      {
        key: 'password', title: t('user.info.list.password'), value: '********', icon: <LockIcon />,
        action: () => { setPasswordModify(true) }
      },
      // { key: 'permission', title: t('user.info.list.permission'), value: 'role', icon: <UserSettingsIcon />, action: () => { } },
    ])
  }

  const onUsernameOk = () => {
    // submit
  }
  const onAvatarOk = () => {
    // submit
  }
  const onPhoneOk = () => {
    // submit
  }
  const onPasswordOk = () => {
    // submit
  }

  const onUsernameCancel = () => setUsernameModify(false)
  const onAvatarCancel = () => setAvatarModify(false)
  const onPhoneCancel = () => setPhoneModify(false)
  const onPasswordCancel = () => setPasswordModify(false)

  const setIcon = (icon, color = '') => <div className={s.icon} style={{ background: color }}>{icon}</div>

  const renderItem = ({ title, key, icon, color, value, action }) => {
    return (
      <List.Item key={key}>
        <List.Item.Meta
          avatar={setIcon(icon, color)}
          title={title}
          description={value}
        />
        {key !== 'email' ? <Button type='link' onClick={action}>{t('common.modify')}</Button> : null}
      </List.Item>
    )
  }

  return (
    <div className={s.info}>
      <Breadcrumbs />
      <Card className={s.container} title={t('breadcrumbs.user.info')}>
        <Row className={s.content}>
          <Col flex={1} md={{ span: 20, justify: 'center' }} lg={{ offset: 6, span: 12 }} xl={{ offset: 4, span: 12, }}>
            <Row className={s.avatarContent} justify='center'>
              <Col flex={1}>
                <div className={s.avatar}>{user.avatar ? <img src={user.avatar} /> : <UserIcon style={{ color: '#fff', fontSize: 70 }} />}</div>
                <Button onClick={() => setAvatarModify(true)}>{t('更换头像')}</Button>
                <div>{t('支持图片格式：jpg,gif,png')}</div>
              </Col>
            </Row>
            <List className={s.infoList} dataSource={infoList} renderItem={renderItem}></List>
          </Col>
        </Row>
      </Card>
      <Modal title={'username'} visible={usernameModify} onCancel={onUsernameCancel} onOk={onUsernameOk}>
        username
      </Modal>
      <Modal title={'avatarModify'} visible={avatarModify} onCancel={onAvatarCancel} onOk={onAvatarOk}>
        avatarModify
      </Modal>
      <Modal title={'phoneModify'} visible={phoneModify} onCancel={onPhoneCancel} onOk={onPhoneOk}>
        phoneModify
      </Modal>
      <Modal title={'passwordModify'} visible={passwordModify} onCancel={onPasswordCancel} onOk={onPasswordOk}>
        passwordModify
      </Modal>
    </div>
  )
}

const props = (state) => {
  return {
    user: state.user,
  }
}

const acts = (dispatch) => {
  return {
    getUserInfo: (refresh) => {
      return dispatch({
        type: "user/getUserInfo",
        payload: refresh,
      })
    },
  }
}

export default connect(props, acts)(Info)
