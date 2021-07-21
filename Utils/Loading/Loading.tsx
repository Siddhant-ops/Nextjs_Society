import styles from "./Loading.module.scss"

const Loading = () => {
    return (
        <div className={styles.bg}>
            <div className={styles.error}>Loading</div>
        </div>
    )
}

export default Loading
