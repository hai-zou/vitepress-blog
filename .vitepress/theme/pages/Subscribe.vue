<template>
	<div class="sub-box">
		<div class="sub-title">📮邮件订阅</div>
		<form
			id="sub-form"
			action="https://tinyletter.com/haizou"
			method="post"
			target="popupwindow"
			@submit="onSubmit"
		>
			<div class="sub-text">
				非常感谢您的关注和支持！欢迎订阅我的博客！
			</div>
			<div class="email-wrapper">
				<input
					type="email"
					class="email-control"
					name="email"
					id="tlemail"
					placeholder="Email@example.com"
					autocomplete="off"
					required
				/>
				<input type="hidden" value="1" name="embed" />
			</div>
			<div class="submit-wrapper">
				<input type="submit" value="订阅" class="submit-btn" />
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
function onSubmit() {
	window.open("https://tinyletter.com/haizou", "popupwindow", "scrollbars=yes,width=800,height=600");
	return true;
}
</script>

<style scoped>
.sub-title {
	text-align: center;
	display: flex;
	align-items: center;
	gap: 10px;
	transform: translateY(50%);
}

.sub-title::before {
    content: "";
    flex-grow: 1;
    border-bottom: 1px solid var(--vp-c-border);
}
.sub-title::after {
    content: "";
    flex-grow: 1;
    border-bottom: 1px solid var(--vp-c-border);
}

.sub-box {
	margin: 3rem 0;
}

#sub-form {
	box-sizing: border-box;
	padding: 2rem;
	border: 1px solid var(--vp-c-border);
	border-top: none;
}

#sub-form .sub-text {
    margin-bottom: 1.5rem;
    text-align: center;
}

.email-wrapper {
	width: 350px;
    max-width: 80%;
	margin: 1rem auto;
}

.email-wrapper .email-control {
    width: 100%;
    border: 1px solid var(--vp-input-border-color);
    font-size: 1rem;
    padding: 5px 10px;
    box-sizing: border-box;
    outline: none;
    text-align: center;
    border-radius: 0.25rem;
    height: 2rem;
}

.email-wrapper .email-control:hover {
    border-color: var(--vp-input-hover-border-color);
}

.email-wrapper .email-control:focus {
    border-width: 2px;
    border-color: var(--vp-c-brand);
}

.submit-wrapper {
	text-align: center;
}

.submit-wrapper .submit-btn {
    padding: 0 5px;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1rem;
    border: 1px solid var(--vp-input-border-color);
    background-color: var(--vp-input-bg-color);
}

.submit-wrapper .submit-btn:hover {
    border-color: var(--vp-input-hover-border-color);
}
</style>