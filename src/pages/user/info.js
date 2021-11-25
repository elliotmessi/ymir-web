import React, { useEffect, useState } from "react"
import { connect } from "dva"
import { Select, Card, Input, Radio, Checkbox, Button, Form, Row, Col, List } from "antd"
import s from "./common.less"
import { useHistory } from "umi"

import t from "@/utils/t"
import Breadcrumbs from "@/components/common/breadcrumb"
import { EmailIcon, LockIcon, SmartphoneIcon, UserIcon, UserSettingsIcon } from "../../components/common/icons"

function Info({ getUserInfo, user }) {

  const [infoList, setInfoList] = useState([])

  useEffect(() => {
    transUserIntoList()
  }, [])

  function getLatestInfo() {
    getUserInfo(true)
  }

  function transUserIntoList() {
    setInfoList([
      {key: 'username', title: t('user.info.list.username'), value: user.username, icon: <UserIcon />, action: () => {}},
      {key: 'email', title: t('user.info.list.email'), value: user.email, icon: <EmailIcon />, action: () => {}},
      {key: 'phone', title: t('user.info.list.phone'), value: user.phone, icon: <SmartphoneIcon />, action: () => {}},
      {key: 'password', title: t('user.info.list.password'), value: '********', icon: <LockIcon />, action: () => {}},
      {key: 'permission', title: t('user.info.list.permission'), value: 'role', icon: <UserSettingsIcon />, action: () => {}},
    ])
  }

  const setIcon = (icon, color = '') => <div className={s.icon} style={{ color }}>{icon}</div>

  const renderItem = ({ title, key, icon, value }) => {
    return (
      <List.Item key={key}>
        <List.Item.Meta
          avatar={setIcon(icon)}
          title={title}
          description={value}
        />
        <Button>{t('common.modify')}</Button>
      </List.Item>
    )
  }

  return (
    <div className={s.info}>
      <Breadcrumbs />
      <Card className={s.container} title={t('breadcrumbs.user.info')}>
        <div className={s.content}>
          <Row className={s.avatarContent} align='middle' justify='center'>
            <Col className={s.avatar}>
              { user.avatar ? <img src={user.avatar} /> : <UserIcon style={{ color: '#fff', fontSize: 80 }} />}
            </Col>
          </Row>
          <List dataSource={infoList} renderItem={renderItem}></List>
        </div>
      </Card>
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
