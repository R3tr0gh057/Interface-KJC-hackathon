export default function Home() {
	const checkBreach = () => {
        const email = document.getElementById('email').value;
        const responseBox = document.getElementById('response');

        fetch(`https://api.xposedornot.com/v1/check-email/${email}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data.breaches)
            responseBox.innerText = data.breaches
        })
    };

	return (
		<>
			<input type="email" name="" id="email" />
			<button onClick={checkBreach}>Check</button>

			<div id="response"></div>
		</>
	);
}
