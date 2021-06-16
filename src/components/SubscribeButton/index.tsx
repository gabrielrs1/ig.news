import styles from "./styles.module.scss";

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: subscribeButtonProps) {
    return (
        <button
         type="button"
         className={styles.subscribeButton}
        >
            Subscribe now
        </button>
    )
}