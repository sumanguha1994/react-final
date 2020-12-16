import { StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from './context';
import { Appbar } from 'react-native-paper'

const title = "Agora RTM QuickStart"


const Toolbar = (props) => (
  <Appbar.Header>
    <Appbar.Action icon="menu" />
    <Appbar.Content title={title} />
  </Appbar.Header>
)


const SubPageToolBar = (props) => {
  const ctx = useContext(AppContext)
  const onPress = () => {
    props.navigation.goBack()
  }

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={onPress} />
      <Appbar.Content title={`CHANNEL ${ctx.channel}`} />
    </Appbar.Header>
  )
}

const PageContainer = (children) => {
  const Comp = children;
  const StackContainer = (_props) => {
    return (
      <Comp {..._props}/>
    )
  }
  StackContainer.navigationOptions = (props) => ({
    header: (
      <>
        {
          props.navigation.state.routeName === "Home" ?
            <Toolbar /> :
            <SubPageToolBar {...props} />
        }
      </>
    ),
    ...(typeof Comp.navigationOptions === 'function'
      ? Comp.navigationOptions(props)
      : Comp.navigationOptions),
  })
  return StackContainer
}

export default PageContainer;