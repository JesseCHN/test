import React, { useState, useEffect } from 'react';
import logo from './assets/images/logo.svg';
// import './App.css'; // 全局引入
import styles from './App.module.css'
// import robots from './mock/robots.json'
import Robot from './components/Robot';
import ShoppingCart from './components/ShoppingCart';
import RobotDiscount from './components/RobotDiscount';
import RobotNext from './components/RobotNext';

const html = "<img src='invalid-image' onerror='alert(\"Hacked!\")' />"
 // eslint-disable-next-line
const jsHacked = "javascript: alert('Hacked!');"

interface Props {
  username: string
}

interface State {
  robotGallery: any[];
  count: number;
}

/**
 * 下面是类组件
 */
class App1 extends React.Component<Props,State> {
  // * 生命周期第一阶段： 初始化
  // 初始化组件 state
  constructor(props) {
    super(props);
    this.state = {
      robotGallery: [],
      count: 0,
    };
  }

  // 在组件创建好dom元素以后、挂载进页面的时候调用
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => this.setState({ robotGallery: data }));
  }

  // * 生命周期第二阶段： 更新
  // 在组件接收到一个新的 prop (更新后)时被调用。
  // componentWillReceiveProps
  // state getDerivedStateFromProps(nextProps, prevState){}
  // shouldComponentUpdate(nextProps, nextState){
  //   return nextState.some !== this.state.some
  // }
  // 组件更新后调用
  componentDidUpdate() { }

  // * 生命周期第三阶段： 销毁
  // 组件销毁后调用，
  // 可以当作析构函数 destructor 来使用
  componentWillUnmount() { }
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt="logo" />
          <h1>机器人</h1>
        </div>
        <div className={styles.robotList}>{html}</div>
        <div><a href={jsHacked}>My website</a></div>
        <button onClick={() => {
          this.setState((preState, preProps) => { return { count: preState.count + 1 } }, () => {
            console.log('count', this.state.count)
          })
          this.setState((preState, preProps) => { return { count: preState.count + 1 } }, () => {
            console.log('count', this.state.count)
          })
          
        }}>Click</button>
        <span>Count: { this.state.count}</span>
        <ShoppingCart />
        <div className={styles.robotList}>
          {this.state.robotGallery.map((r) =>
            <Robot key={r.id} id={r.id} email={r.email} name={r.name} />
          )}
        </div>
      </div>
    )
  }
}

/**
 * 函数式组件
 */
const App: React.FC<Props> = (props) => {
  const [count, setCount] = useState<number>(0)
  const [robotGallery, setRobotGallery] = useState<any>([]) // 网络获取的可以设置成any
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  
  // 当count状态发生变化时，触发effect
  useEffect(() => {
    document.title = `点击了${count}次`
  }, [count])

  // 模拟componentDidMount
  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((data) => setRobotGallery(data))
  // }, [])

  // 使用async/await 模拟componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await response.json()
        setRobotGallery(data)
      } catch (error) {
        setError(error.message)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  // 模拟componentDidUpdate,只要state状态变了，就会触发更新
  useEffect(() => {
  })


  return <div className={styles.app}>
    <div className={styles.appHeader}>
      <img src={logo} className={styles.appLogo} alt="logo" />
      <h1>机器人 { props.username }</h1>
    </div>
    <div className={styles.robotList}>{html}</div>
    <div><a href={jsHacked}>My website</a></div>
    <button onClick={() => {
      setCount(count + 1) // 异步的，没有回调

    }}>Click</button>
    <span>Count: {count}</span>
    <ShoppingCart />
    {error !== ''  && <div>网站出错了： { error }</div> }
    { !loading?
      (<div className={styles.robotList}>
        {robotGallery.map((r, index) =>
            index % 2 === 0 ?
            <RobotNext key={r.id} id={r.id} email={r.email} name={r.name} />
            :
            <Robot key={r.id} id={r.id} email={r.email} name={r.name} />
        )}
      </div>)
      : (<h2>loading 加载中</h2>)
    }
  </div>
}

export default App;
export { App1 }
