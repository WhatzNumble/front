import { Transition, TransitionGroup } from 'react-transition-group';
import { useRouter } from 'next/router';
import { Constraint } from 'libs/types';

const TIMEOUT = 100;

const STYLE: Constraint<object> = {
    entering: {
        opacity: 0,
        // transform: 'translateY(-20px)',
    },
    entered: {
        opacity: 1,
        // transform: 'translateY(0)',
        transition: `transform ${TIMEOUT}ms, opacity ${TIMEOUT}ms`,
    },
    exiting: {
        opacity: 0,
        // transform: 'translateY(20px)',
        transition: `transform ${TIMEOUT}ms, opacity ${TIMEOUT}ms`, 
    },
};

interface Props {
    children: React.ReactNode
}

function PageMotionLayout({children}: Props){
    const router = useRouter();

    return (
        <TransitionGroup>
            <Transition
                key={router.pathname}
                timeout={{
                    enter: TIMEOUT,
                    exit: TIMEOUT,
                }}
            >
                {(status) => (
                    <div style={{...STYLE[status]}}>
                        {children}
                    </div>
                )}
            </Transition>
        </TransitionGroup>
    );
}

export default PageMotionLayout;