package movierankchart.domain.movierank.controller;

import lombok.RequiredArgsConstructor;
import movierankchart.domain.movierank.dto.request.FindMovieRankLineChartRequestDto;
import movierankchart.domain.movierank.dto.request.FindMovieRankPieChartRequestDto;
import movierankchart.domain.movierank.dto.request.FindMovieRankTopTenRequestDto;
import movierankchart.domain.movierank.dto.response.FindMovieRankLineChartResponseDtos;
import movierankchart.domain.movierank.dto.response.FindMovieRankPieChartResponseDtos;
import movierankchart.domain.movierank.dto.response.FindMovieRankTopTenResponseDtos;
import movierankchart.domain.movierank.service.MovieRankService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/movie-rank")
public class MovieRankController {
    private final MovieRankService movieRankService;

    @GetMapping("/top-ten")
    public ResponseEntity<FindMovieRankTopTenResponseDtos> findMovieRankTopTen(@Valid FindMovieRankTopTenRequestDto findMovieRankTopTenRequestDto) {
        FindMovieRankTopTenResponseDtos findMovieRankTopTenResponseDtos = movieRankService.findMovieRankTopTen(findMovieRankTopTenRequestDto);
        return ResponseEntity.ok(findMovieRankTopTenResponseDtos);
    }

    @GetMapping("/line-chart")
    public ResponseEntity<FindMovieRankLineChartResponseDtos> findMovieRankLineChart(@Valid FindMovieRankLineChartRequestDto findMovieRankLineChartRequestDto) {
        FindMovieRankLineChartResponseDtos findMovieRankLineChartResponseDtos = movieRankService.findMovieRankLineChart(findMovieRankLineChartRequestDto);
        return ResponseEntity.ok(findMovieRankLineChartResponseDtos);
    }

    @GetMapping("/line-chart/{moviesId}")
    public ResponseEntity<FindMovieRankLineChartResponseDtos> findMovieRankLineChartByMoviesId(@PathVariable long moviesId) {
        FindMovieRankLineChartResponseDtos movieRankLineChartByMoviesId = movieRankService.findMovieRankLineChartByMoviesId(moviesId);
        return ResponseEntity.ok(movieRankLineChartByMoviesId);
    }

    @GetMapping("/pie-chart")
    public ResponseEntity<FindMovieRankPieChartResponseDtos> findMovieRankPieChart(@Valid FindMovieRankPieChartRequestDto findMovieRankPieChartRequestDto) {
        FindMovieRankPieChartResponseDtos findMovieRankPieChartResponseDtos = movieRankService.findMovieRankPieChart(findMovieRankPieChartRequestDto);
        return ResponseEntity.ok(findMovieRankPieChartResponseDtos);
    }
}
