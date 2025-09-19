import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mathbuzz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mathbuzz.component.html',
  styleUrl: './mathbuzz.component.css'
})
export class MathbuzzComponent implements OnInit, OnDestroy {

  titleText = 'MathBuzz | maTools'
  descriptionText = 'Online Game for Childred to improve spontaniours responsing using Maths!! It helps childred improve there IQ and decision making skills!!'
  url = 'https://matools.org/' + 'math-buzz'
  siteName = 'maTools.org'
  twitterAccId = '@mathrusoft'
  keyWords = 'Math, Children, Children game, Online game, Number, Positive, Equation, IQ Game, Decision Game, Maths, Mathematics'

  constructor(private meta: Meta,
    private title: Title,
    private route: ActivatedRoute,
    private analytics: AngularFireAnalytics) {

      this.meta.updateTag({ name: 'robots', content: `noodp,index,follow,all`});
      this.title.setTitle(`${this.titleText}`);
      this.meta.updateTag({ name: 'description', content: `${this.descriptionText}`});
      this.meta.updateTag({ name: 'keywords', content: `${this.keyWords}`});

      this.meta.updateTag({ name: 'og:type', content: `website`});
      this.meta.updateTag({ name: 'og:url', content: `${this.url}`});
      this.meta.updateTag({ name: 'og:title', content: `${this.titleText}`});
      this.meta.updateTag({ name: 'og:description', content: `${this.descriptionText}`});
      this.meta.updateTag({ name: 'og:site_name', content: `${this.siteName}`});

      this.meta.updateTag({ name: 'twitter:site', content: `${this.twitterAccId}`});
      this.meta.updateTag({ name: 'twitter:account_id', content: `${this.titleText}`});
      this.meta.updateTag({ name: 'twitter:title', content: `${this.titleText}`});
      this.meta.updateTag({ name: 'twitter:description', content: `${this.descriptionText}`});

      this.logPageView();

      this.generateEquationFirstTime()
  }

  @HostListener('window:keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.wrongClick();
        break;
      case 'ArrowRight':
        this.corretClick();
        break;
      case 'ArrowUp':
        this.corretClick();
        break;
      case 'ArrowDown':
        this.wrongClick();
        break;
      default:
        break;
    }
  }

  logPageView() {
    this.analytics.logEvent('page_view', { page_path: '/' });
  }

  totalTime: number = 6; // Default total time
  progress: number = 0;
  timerInterval: any; // To store the interval ID

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval); // Clear interval to prevent memory leaks
    }
  }

  startTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval); // Clear interval to prevent memory leaks
    }
    this.progress = 0; // Reset progress
    const interval = 1000;

    this.timerInterval = setInterval(() => {
      this.progress += (100 / this.totalTime);

      if (this.progress >= 100) {
        this.progress = 100;
        this.timeOut = "Oops Time Out! "
        this.showScore()
      }
    }, interval);
  }

  a = 9
  b = 10
  a_b = 21
  result = true
  score = 0
  showScoreResult = false
  timeOut = ""

  questionString = ""
  generateEquation() {
    this.showScoreResult = false
    this.timeOut = ""
    this.score++
    this.startTimer()
    this.a = this.getA()
    this.b = this.getB()
    if(this.getRandomBoolean()) {
      this.result = true
      this.a_b = this.a + this.b
    } else {
      this.result = false
      this.a_b = this.getWrong(this.a, this.b)
    }
    let newQuestion = `${this.a} + ${this.b} = ${this.a_b}`
    if(newQuestion == this.questionString ) {
      this.generateEquation()
      return
    }
    this.questionString = newQuestion
  }

  generateEquationFirstTime() {
    this.score = 0
    if (this.timerInterval) {
      clearInterval(this.timerInterval); // Clear interval to prevent memory leaks
    }
    this.progress = 0
    this.showScoreResult = false
    this.timeOut = ""
    this.a = this.getA()
    this.b = this.getB()
    if(this.getRandomBoolean()) {
      this.result = true
      this.a_b = this.a + this.b
    } else {
      this.result = false
      this.a_b = this.getWrong(this.a, this.b)
    }
    let newQuestion = `${this.a} + ${this.b} = ${this.a_b}`
    if(newQuestion == this.questionString ) {
      this.generateEquation()
      return
    }
    this.questionString = newQuestion
  }

  wrongClick() {
    if(!this.result) {
      return this.generateEquation()
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval); // Clear interval to prevent memory leaks
    }
    this.timeOut = "You said Wrong for this! "
    this.showScore()
  }

  corretClick() {
    if(this.result) {
      return this.generateEquation()
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval); // Clear interval to prevent memory leaks
    }
    this.timeOut = "You said Correct for this! "
    this.showScore()
  }

  showScore() {
    this.showScoreResult = true
  }

  getA(): number {
    let min = 1
    let max = 3

    if(this.score > 5) {
      min = 2 
      max = 4
    }

    if(this.score > 10) {
      min = 3
      max = 5
    }

    if(this.score > 30) {
      min = 4 
      max = 6
    }

    if(this.score > 60) {
      this.totalTime = 5
      min = 5 
      max = 7
    }


    if(this.score > 100) {
      this.totalTime = 4
      min = 3 
      max = 6
    }

    if(this.score > 120) {
      min = 4 
      max = 7
    }


    if(this.score > 150) {
      min = 5 
      max = 8
    }

    if(this.score > 200) {
      this.totalTime = 3
      min = 6 
      max = 9
    }


    if(this.score > 240) {
      this.totalTime = 3
      min = 7 
      max = 10
    }

    if (min > max) {
      let t = min
      min = max
      max = t
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  getB(): number {
    let min = 1
    let max = 3

    if(this.score > 5) {
      min = 2 
      max = 4
    }

    if(this.score > 10) {
      min = 3
      max = 5
    }

    if(this.score > 30) {
      min = 4 
      max = 6
    }

    if(this.score > 60) {
      this.totalTime = 5
      min = 5 
      max = 7
    }


    if(this.score > 100) {
      this.totalTime = 4
      min = 3 
      max = 6
    }

    if(this.score > 120) {
      min = 4 
      max = 7
    }


    if(this.score > 150) {
      min = 5 
      max = 8
    }

    if(this.score > 200) {
      this.totalTime = 3
      min = 6 
      max = 9
    }


    if(this.score > 240) {
      this.totalTime = 3
      min = 7 
      max = 10
    }

    if (min > max) {
      let t = min
      min = max
      max = t
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getWrong(a:number, b:number): number {
    if(this.getRandomBoolean()) {
      return (a + b) - 1
    } else {
      return (a + b) + 1
    }
  }

  getRandomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  // Preview functionality
  showPreview: boolean = false;
  previewMode: boolean = false;
  previewQuestion: string = '';
  previewAnswer: boolean = false;
  previewExplanation: string = '';
  difficultyLevel: string = 'Beginner';
  questionHistory: Array<{question: string, answer: boolean, correct: boolean, time: number}> = [];
  averageResponseTime: number = 0;

  togglePreviewMode() {
    this.previewMode = !this.previewMode;
    if (this.previewMode) {
      this.generatePreviewQuestion();
    } else {
      this.showPreview = false;
    }
  }

  generatePreviewQuestion() {
    if (!this.previewMode) return;
    
    const a = this.getA();
    const b = this.getB();
    const isCorrect = this.getRandomBoolean();
    const answer = isCorrect ? a + b : this.getWrong(a, b);
    
    this.previewQuestion = `${a} + ${b} = ${answer}`;
    this.previewAnswer = isCorrect;
    this.previewExplanation = isCorrect 
      ? `Correct! ${a} + ${b} = ${a + b}` 
      : `Incorrect! ${a} + ${b} = ${a + b}, not ${answer}`;
    
    this.difficultyLevel = this.getDifficultyLevel();
    this.showPreview = true;
  }

  getDifficultyLevel(): string {
    if (this.score <= 5) return 'Beginner';
    if (this.score <= 10) return 'Easy';
    if (this.score <= 30) return 'Medium';
    if (this.score <= 60) return 'Hard';
    if (this.score <= 100) return 'Expert';
    if (this.score <= 150) return 'Master';
    if (this.score <= 200) return 'Legend';
    return 'Ultimate';
  }

  getDifficultyColor(): string {
    switch (this.difficultyLevel) {
      case 'Beginner': return '#28a745';
      case 'Easy': return '#20c997';
      case 'Medium': return '#ffc107';
      case 'Hard': return '#fd7e14';
      case 'Expert': return '#dc3545';
      case 'Master': return '#6f42c1';
      case 'Legend': return '#e83e8c';
      case 'Ultimate': return '#6c757d';
      default: return '#28a745';
    }
  }

  getScoreColor(): string {
    if (this.score < 10) return '#28a745';
    if (this.score < 25) return '#20c997';
    if (this.score < 50) return '#ffc107';
    if (this.score < 100) return '#fd7e14';
    if (this.score < 200) return '#dc3545';
    return '#6f42c1';
  }

  getScoreMessage(): string {
    if (this.score === 0) return 'Ready to start!';
    if (this.score < 5) return 'Great start!';
    if (this.score < 10) return 'Keep it up!';
    if (this.score < 25) return 'You\'re getting good!';
    if (this.score < 50) return 'Excellent progress!';
    if (this.score < 100) return 'Amazing skills!';
    if (this.score < 200) return 'Outstanding performance!';
    return 'Math Genius!';
  }

  getNextLevelScore(): number {
    if (this.score < 5) return 5;
    if (this.score < 10) return 10;
    if (this.score < 25) return 25;
    if (this.score < 50) return 50;
    if (this.score < 100) return 100;
    if (this.score < 200) return 200;
    return this.score + 50;
  }

  getProgressToNextLevel(): number {
    const nextLevel = this.getNextLevelScore();
    const currentLevel = this.getPreviousLevelScore();
    return ((this.score - currentLevel) / (nextLevel - currentLevel)) * 100;
  }

  getPreviousLevelScore(): number {
    if (this.score < 5) return 0;
    if (this.score < 10) return 5;
    if (this.score < 25) return 10;
    if (this.score < 50) return 25;
    if (this.score < 100) return 50;
    if (this.score < 200) return 100;
    return 200;
  }

  getTimeRemaining(): number {
    return Math.max(0, this.totalTime - (this.progress / 100) * this.totalTime);
  }

  getTimeColor(): string {
    const timeLeft = this.getTimeRemaining();
    if (timeLeft > this.totalTime * 0.6) return '#28a745';
    if (timeLeft > this.totalTime * 0.3) return '#ffc107';
    return '#dc3545';
  }

  getQuestionComplexity(): string {
    const maxNum = Math.max(this.a, this.b);
    if (maxNum <= 3) return 'Simple';
    if (maxNum <= 5) return 'Basic';
    if (maxNum <= 7) return 'Intermediate';
    if (maxNum <= 9) return 'Advanced';
    return 'Expert';
  }

  getQuestionType(): string {
    return 'Addition';
  }

  getExpectedAnswer(): number {
    return this.a + this.b;
  }

  getCurrentAnswer(): number {
    return this.a_b;
  }

  isQuestionCorrect(): boolean {
    return this.result;
  }

  getHint(): string {
    if (this.isQuestionCorrect()) {
      return `This equation is correct: ${this.a} + ${this.b} = ${this.getExpectedAnswer()}`;
    } else {
      return `This equation is incorrect. The correct answer is ${this.getExpectedAnswer()}, not ${this.getCurrentAnswer()}`;
    }
  }

  getMotivationalMessage(): string {
    const messages = [
      'You\'re doing great!',
      'Keep up the excellent work!',
      'Math is fun with you!',
      'You\'re getting better!',
      'Amazing progress!',
      'You\'re a math star!',
      'Keep challenging yourself!',
      'You\'re unstoppable!'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

}
