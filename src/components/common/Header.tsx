import { Link } from "react-router";
import styled from "styled-components";
import type { User } from "firebase/auth";
import { ActionButton } from "../../styles/styles.tsx";
import { auth } from "../../firebase.ts";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

const Head = styled.header`
    background-color: #eee;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ccc;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    padding: 10px 20px;
`;

const Logo = styled(Link)`
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
`;

const AuthBox = styled.div`
    display: flex;
    gap: 15px;
`;

type Props = {
    currentUser: User | null;
};

function Header({ currentUser }: Props) {
    const [theme, setTheme] = useState<"light" | "dark">(
        // localStorage에 쓸 수 있는 값은 string
        // 하지만 내가 쓸 "theme"키의 value는 "light"와 "dark"만 나올거라고 제한을 검
        // 거기다 덧붙여, 혹시라도 "theme"키에 해당하는 값이 없으면, 논리합을 통해 "light"가 초기값으로 세팅되게 함
        (localStorage.getItem("theme") as "light" | "dark") || "light",
    );

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        // 순수 자바스크립트로 html 태그 선택
        const html = document.documentElement;

        if (theme === "dark") {
            // html 태그의 class 목록에 "dark"를 추가
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            // html 태그의 class 목록에서 "dark"를 삭제
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    const onLogout = async () => {
        try {
            await auth.signOut();
            alert("로그아웃 되었습니다.");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <header
            className={twMerge(
                ["flex", "justify-center"],
                ["bg-background-paper"],
                ["border-b", "border-divider"],
            )}>
            <nav
                className={twMerge(
                    ["w-full", "max-w-[1200px]", "px-5", "py-2.5"],
                    ["flex", "justify-between", "items-center"],
                )}>
                <Link to={"/"} className={twMerge(["text-2xl", "font-bold", "text-primary-main"])}>
                    React Board
                </Link>
                {currentUser ? (
                    <div className={twMerge(["flex", "gap-4", "items-center"])}>
                        <span style={{ color: "#555" }}>
                            {/* string 타입에서 사용할 수 있는 메소드 : split() */}
                            {/* split : string에서 어떠한 글자를 기준으로 분리할 수 있는 메소드 */}
                            {/*         결과는 array 형태로 저장됨 */}
                            {/* 예시 : "abc@abc.com"을 "@"로 split 하면, ["abc", "abc.com"] 으로 반환 */}
                            환영합니다, {currentUser.email?.split("@")[0]}님!
                        </span>

                        <button
                            onClick={toggleTheme}
                            className={twMerge(
                                ["p-2"],
                                ["flex", "justify-center", "items-center"],
                                ["bg-divider", "rounded-full"],
                            )}>
                            테마
                        </button>

                        <ActionButton onClick={onLogout}>로그아웃</ActionButton>
                    </div>
                ) : (
                    <div className={twMerge(["flex", "gap-4"])}>
                        <Link to={"/login"}>로그인</Link>
                        <Link to={"/register"}>회원가입</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
