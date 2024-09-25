 class StringCalculator {
                add(numbersString) {
                    // Return 0 for empty input
                    if (!numbersString) return 0;

                    const numbersArray = this.multiDelimiterCheck(numbersString);

                    const negativeNumbers = numbersArray.filter(num => num < 0);
                    if (negativeNumbers.length > 0) {
                        throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(',')}`);
                    }

                    // Convert numbers to integers and ignore numbers greater than 1000
                    const numbers = numbersArray.map(Number).filter(num => num <= 1000);

                    // Return the sum of the valid numbers
                    return numbers.reduce((sum, num) => sum + num, 0);
                }

                multiDelimiterCheck(numbersString) {
                    let delimiter = /[\n,\\n]/; 
                    let numbers = numbersString.split(delimiter);

                    if (numbers[0].startsWith('//')) {
                        const customDelimiter = numbers[0].slice(2);
                        numbers = numbers.slice(1).join(',').split(customDelimiter);
                    }

                    return numbers.map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));
                }
            }

            function calculate() {
                const input = document.getElementById('inputField').value;
                console.log({ input });
                const calculator = new StringCalculator();
                const resultElement = document.getElementById('result');

                try {
                    const result = calculator.add(input);
                    resultElement.innerText = `Result: ${result}`;
                    resultElement.classList.remove('error');
                } catch (error) {
                    resultElement.innerText = error.message;
                    resultElement.classList.add('error');
                }
            }